
// POST a new phone number

import contactmodel from "../model/contactmodel.js";

  export const registerphone = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        const newPhoneNumber = new contactmodel({ phoneNumber });
        const savedPhoneNumber = await newPhoneNumber.save();
        console.log(newPhoneNumber)
        res.status(201).json(savedPhoneNumber);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  // GET all phone numbers
  export const getphone = async (req, res) => {
    try {
      const phoneNumbers = await PhoneNumber.find();
      res.status(200).json(phoneNumbers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  