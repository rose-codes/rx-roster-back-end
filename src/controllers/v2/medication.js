const { dynamoClient } = require("../../db/dynamo");
const tableName = "rx-roster-medications";

const getAllMedications = async (req, res) => {
  const userId = req.user.userId;
  const filter = req.body;
  const filterList = Object.keys(filter);
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
    if (filter) {
      const filteredMedsList = allMedications.filter((med) => {
        for (criteria of filterList) {
          if (med[criteria] !== filter[criteria]) {
            return false;
          }
        }
        return true;
      });
      res.status(200).send(filteredMedsList);
    } else {
      res.status(200).send(allMedications);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneMedication = async (req, res) => {
  const userId = req.user.userId;
  const medId = req.body;
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
  const userId = req.user.userId;
  const medId = req.params.id;
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
    const userMed = await dynamoClient
      .get({
        TableName: tableName,
        Key: {
          PK: "USER#" + userId,
        },
      })
      .promise();
    const allMedications = userMed.Item.medications;
    let updatedMed = null;
    for (let med of allMedications) {
      if (med.medId === medId) {
        for (update of userUpdates) {
          med[update] = req.body[update];
        }
        updatedMed = med;
        break;
      }
    }
    if (!updatedMed) {
      return res.status(404).send("Medication not found");
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
            ":m": allMedications,
          },
        })
        .promise();
      res.status(200).send(updatedMed);
    } catch (err) {
      const error = { ...err, condition: "List was not updated" };
      res.status(500).send(error);
    }
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
    const filteredMedsList = allMedications.filter(
      (med) => med.medId !== medId
    );

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
