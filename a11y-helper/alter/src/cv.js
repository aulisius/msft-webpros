import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";

let cvClient;

export const initComputerVisionClient = () => {
  cvClient = new ComputerVisionClient(
    new ApiKeyCredentials({
      inHeader: { "Ocp-Apim-Subscription-Key": process.env.KEY }
    }),
    process.env.AZURE_URL
  );
};

export const getDescription = async imageUrl => {
  try {
    return (await cvClient.describeImage(imageUrl)).captions;
  } catch (err) {
    console.warn(err);
    return {
      error: err
    };
  }
};
