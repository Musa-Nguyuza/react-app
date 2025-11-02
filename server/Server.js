import express from 'express';
import fs from 'fs';
import Joi from 'joi';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express();
const PORT = 3001;
const SECRET = "jwt_scret_key";

app.use(cors());
app.use(express.json());

// Joi schema for each regulatory table row
const regulatoryRowSchema = Joi.object({
  phrase: Joi.string().required(),
  category: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
});

const marketRowSchema = Joi.object({
  phrase: Joi.string().required(),
  category: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
})

const productRowSchema = Joi.object({
  phrase: Joi.string().required(),
  category: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
})

const processRowSchema = Joi.object({
  phrase: Joi.string().required(),
  category: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
})

const customerExpRowSchema = Joi.object({
  phrase: Joi.string().required(),
  category: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
})

const remediationRowSchema = Joi.object({
  phrase: Joi.string().required(),
  compliance: Joi.string().valid('Yes', 'No','N/A').required(),
  comment: Joi.string().allow('').optional()
})


// Joi schema for the full form including the table
const formSchema = Joi.object({
  callSystem: Joi.string().required(),
  dateTime: Joi.date().iso().required(),
  dateTimeEnd: Joi.date().iso().optional(),
  selectedType: Joi.any().optional(),
  Selectedcategory: Joi.any().optional(),
  selectedSubCategory: Joi.any().optional(),
  secondCall: Joi.any().optional(),
  additionalCall: Joi.any().optional(),
  policyNumber: Joi.string().optional(),
  AgentName: Joi.string().optional(),
  riskOfficer: Joi.string().optional(),
  teamLeader: Joi.string().optional(),
  callDuration: Joi.number().positive().required(),
  contactID: Joi.string().optional(),
  regulatoryTableData: Joi.array().items(regulatoryRowSchema).optional(),
  marketConductTableData : Joi.array().items(marketRowSchema).optional(),
  processTableData : Joi.array().items(processRowSchema).optional(),
  remediationTableData : Joi.array().items(remediationRowSchema).optional(),
  customerExperienceTableData : Joi.array().items(customerExpRowSchema).optional(),
  productRiskTableData : Joi.array().items(productRowSchema).optional()
});

//Submitting all the data
app.post('/submit-form', (req, res) => {
  const { error, value } = formSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      details: error.details.map((d) => d.message),
    });
  }

  fs.readFile('./data.json', 'utf8', (err, data) => {
    let existingData = [];

    if (err && err.code !== 'ENOENT') {
      console.error('❌ Read error:', err);
      return res.status(500).json({ message: 'Failed to read data file' });
    }

    try {
      existingData = data ? JSON.parse(data) : [];
    } catch (parseErr) {
      console.error('❌ JSON parse error:', parseErr);
      return res.status(500).json({ message: 'Corrupted data file' });
    }

    const nextId = existingData.length > 0
      ? Math.max(...existingData.map(item => item.id || 0)) + 1
      : 1;

    const newEntry = {
      id: nextId,
      "Contact ID": value.contactID || "",
      "Policy Number": value.policyNumber || "",
      "Call System": value.callSystem || "",
      "Call Type": value.selectedType?.type || "",
      "Product Type": value.Selectedcategory?.name || "",
      "Product Subcat Type": value.selectedSubCategory || "",
      "Agent Name": value.AgentName || "",
      "Risk Officer Name": value.riskOfficer || "",
      "Team Leader Name": value.teamLeader || "",
      "Date & Time of call": new Date(value.dateTime).toLocaleString("en-ZA"),
      "Date & Time of call end": value.dateTimeEnd ? new Date(value.dateTimeEnd).toLocaleString("en-ZA") : "",
      "Total call duration": value.callDuration.toString(),
      "Second Call": value.secondCall?.value || "",
      "Additional Call IDs": value.additionalCall || "",
      "Regulatory Table": value.regulatoryTableData,
      "Market Conduct Table": value.marketConductTableData,
      "Product Risk Table" : value.productRiskTableData,
      "Process Table" : value.processTableData,
      "Customer Experience Table" : value.customerExperienceTableData,
      "Remediation" : value.remediationTableData

    };

    existingData.push(newEntry);

    fs.writeFile('./data.json', JSON.stringify(existingData, null, 2), (err) => {
      if (err) {
        console.error('❌ Write error:', err);
        return res.status(500).json({ message: 'Failed to save data' });
      }
      res.status(200).json({ message: 'Form submitted successfully', id: nextId });
    });
  });
});


//get all the submitted data
app.get('/api/data', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});


//get table data
app.get('/api/data/:id', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });

    const allData = JSON.parse(data);
    const item = allData.find(d => d.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: 'Item not found' });

    res.json(item);
  });
});

//submitting findings
app.post('/api/dispute', (req, res) => {
  const disputeData = req.body;

  fs.readFile('./dispute.json', 'utf8', (err, data) => {
    let disputes = [];

    if (!err && data) {
      disputes = JSON.parse(data);
    }

    // Determine the next ID
    const nextId = disputes.length > 0
      ? Math.max(...disputes.map(d => d.id || 0)) + 1
      : 1;

    // Assign the new ID
    const newDispute = { id: nextId, ...disputeData };

    disputes.push(newDispute);

    fs.writeFile('./dispute.json', JSON.stringify(disputes, null, 2), (err) => {
      if (err) {
        console.error('Error writing to dispute.json:', err);
        return res.status(500).send('Failed to save dispute');
      }
      res.status(200).send('Dispute saved successfully.');
    });
  });
});

//get all the findings
app.get('/api/dispute/data', (req, res) => {
  fs.readFile('./dispute.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

//update by an id
app.put('/api/dispute/data/:id', (req, res) => {
  const updatedFinding = req.body;
  const id = parseInt(req.params.id);

  fs.readFile('./dispute.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');

    let findings = JSON.parse(data);
    const index = findings.findIndex(f => f.id === id);
    if (index === -1) return res.status(404).send('Finding not found');

    findings[index] = updatedFinding;

    fs.writeFile('./dispute.json', JSON.stringify(findings, null, 2), err => {
      if (err) return res.status(500).send('Error writing file');
      res.send('Finding updated successfully');
    });
  });
});


//find phrase id, index and tablename
app.post('/api/find-phrase', (req, res) => {
  const { phrase, policyNumber } = req.body;

  if (!phrase || !policyNumber) {
    return res.status(400).json({ error: 'Missing phrase or policy number' });
  }

  const details = JSON.parse(fs.readFileSync('./dispute.json'));

  const matchedDetail = details.find(d => d.policyNumber === policyNumber);

  if (!matchedDetail) {
    return res.status(404).json({ error: 'Policy not found' });
  }

  const { id, FindingRegulatory, FindingMarket, FindingProduct, FindingCustomer, FindingProcess } = matchedDetail;

  const findIndex = (table, name) => {
    const index = table.findIndex(item => item.phrase.trim() === phrase.trim());
    return index !== -1 ? { id, tableName: name, index } : null;
  };

  const result =
    findIndex(FindingRegulatory, 'FindingRegulatory') ||
    findIndex(FindingMarket, 'FindingMarket') ||
    findIndex(FindingProduct, 'FindingProduct') ||
    findIndex(FindingCustomer, 'FindingCustomer') ||
    findIndex(FindingProcess, 'FindingProcess');

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'Phrase not found' });
  }
});



// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('./Users.json'));

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid Credentials' });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected user info endpoint
app.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    const users = JSON.parse(fs.readFileSync('./Users.json'));
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token'+ err });
  }
});




app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

