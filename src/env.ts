import dotenv from 'dotenv';

dotenv.config();

const luanNames = process.env.LUAN_NAMES ? process.env.LUAN_NAMES.split(',') : [];
const arthurNames = process.env.ARTHUR_NAMES ? process.env.ARTHUR_NAMES.split(',') : [];

export const NAMES = {
  luan: luanNames,
  arthur: arthurNames
}

export default {
  LUAN_VALUE: parseInt(process.env.LUAN_VALUE || "0"),
  ARTHUR_VALUE: parseInt(process.env.ARTHUR_VALUE || "0"),
  BOT_TOKEN: process.env.BOT_TOKEN,
}