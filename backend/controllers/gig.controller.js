import apiStatus from "../Enums/apiStatus";
import { Gig } from "../models/gig.model";

const createGig = async (req, res, next) => {
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const saveGig = await newGig.save();
    res.status(201).send({
      status: apiStatus.success,
      message: "Gig created successfully",
      data: saveGig,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createGig };
