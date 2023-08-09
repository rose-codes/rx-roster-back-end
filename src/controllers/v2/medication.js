const { dynamoClient } = require("../../db/dynamo");
const tableName = "rx-roster-medications";

const getAllMedications = async (req, res) => {
  const userId = req.user.userId;
  try {
    const userMed = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          PK: "USER#" + userId,
        },
      })
      .promise();
    const allMedications = userMed.Item.medications;
    res.status(200).send(allMedications);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneMedication = async (req, res) => {
  const userId = req.user.userId;
  const { medId } = req.body;
  console.log("userId:", userId, "medId:", medId);
  try {
    const userMedList = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          PK: "USER#" + userId,
        },
      })
      .promise();
    const allMedications = userMedList.Item.medications;
    let foundMed = null;
    for (let med of allMedications) {
      if (med.medId === medId) {
        console.log("med:", med);
        foundMed = med;
        break;
      }
    }
    if (!foundMed) {
      return res.status(404).send("Medication not found");
    } else {
      res.send(foundMed);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const addMedication = async (req, res) => {
  const userId = req.user.userId;
  const medId = crypto.randomUUID();
  const medObj = { ...req.body, medId };
  var params = {
    TableName: tableName,
    Key: {
      PK: "USER#" + userId,
    },
    UpdateExpression: "SET medications = list_append(medications, :m)",
    ConditionExpression: "NOT contains(medications, :i)",
    ExpressionAttributeValues: {
      ":m": [medObj],
      ":i": medObj,
    },
  };
  try {
    const medication = await dynamoClient.update(params).promise();
    res.status(201).send(medObj);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateMedication = async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUpdates = [
    "strength",
    "prescribedFor",
    "instructions",
    "prescriber",
    "pharmacyFilled",
    "manufacturer",
    "currentlyTaking",
    "datePrescribed",
    "startDate",
    "sideEffects",
  ];
  const isValidUpdate = (userUpdates, allowedUpdates) => {
    const bool = false;
    for (key in userUpdates) {
      if (allowedUpdates.includes(key)) {
        bool = true;
      }
    }
    return true;
  };

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!medication) {
      return res.status(404).send();
    }
    res.send(medication);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteMedication = async (req, res) => {
  const userId = req.user.userId;
  const medId = req.params.id;
  try {
    const userMed = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          PK: "USER#" + userId,
        },
      })
      .promise();
    const allMedications = userMed.Item.medications;
    // console.log("allMedications:", allMedications);
    // res.status(201).send("First call passed");
    const filteredMedsList = allMedications.filter(
      (med) => med.medId !== medId
    );
    // console.log("Filtered list:", filteredMedsList);
    if (allMedications.length == filteredMedsList.length) {
      return res.status(400).send("Medication not found");
    }
    try {
      const newMedsItem = await dynamoClient
        .update({
          TableName: tableName,
          Key: {
            PK: "USER#" + userId,
          },
          UpdateExpression: "SET medications = :m",
          ExpressionAttributeValues: {
            ":m": filteredMedsList,
          },
        })
        .promise();
      res.status(200).send(filteredMedsList);
    } catch (err) {
      const error = { ...err, condition: "List was not updated" };
      res.status(500).send(error);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllMedications,
  getOneMedication,
  addMedication,
  updateMedication,
  deleteMedication,
};
