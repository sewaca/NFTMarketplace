import { Contract, ethers } from "ethers";
import contractABI from "../data/WethABI.json";

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const contractAdress = "0x61f8A2bF3a507204F53D47814eDBf6a8d425B9F9";
export const contract = new Contract(contractAdress, contractABI, provider);

export { default as useApiMutation } from "./useApiMutation";
export { default as useApiRequest } from "./useApiRequest";
export { default as useCheckBalance } from "./smartcontractFunctions/useCheckBalance";
