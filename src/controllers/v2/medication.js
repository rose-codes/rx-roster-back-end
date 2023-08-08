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
  const { userId, medId } = req.body;
  try {
    const userMed = await dynamoClient.get({
      TableName: tableName,
      Key: {
        userId: "USER#" + userId,
      },
    });
    const allMedications = userMed.Item.medications;
    const filterMed = allMedications.filter((med) => {
      if (med.medId === medId) {
        return med;
      }
    });
    if (!filterMed) {
      return res.status(404).send("Medication not found");
    } else {
      res.send(foundMed);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const addMedication = async (req, res) => {
  const userId = req.userId;
  const medObj = { ...req.body };
  var params = {
    TableName: tableName,
    Key: {
      userId: {
        S: userId,
      },
    },
    UpdateExpression:
      "SET #ri = list_append(if_not_exists(#ri, :empty_list), :vals)",
    ExpressionAttributeNames: {
      "#ri": "medications",
    },
    ExpressionAttributeValues: {
      ":vals": {
        L: [
          {
            M: medObj,
          },
        ],
      },
      ":empty_list": { L: [] },
    },
    ReturnValues: "ALL_NEW",
  };
  try {
    const medication = await dynamoClient.update(params);
    res.status(201).send(medication);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateMedication = async (req, res) => {
  console.log(req);
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
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) {
      return res.status(404).send();
    }
    const newMedications = await Medication.find({});
    res.send(newMedications);
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
