import { atom } from "jotai";

export const routineSelfieAtom = atom({
  file: null,
  previewUrl: "",
  storagePath: "",
  isUploaded: false,
  sourceType: "",
  uploadedAt: null,
});

export const createSelfiePreview = (file) => {
  if (!file || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return "";
  }

  return URL.createObjectURL(file);
};

export const clearRoutineSelfieAtom = (prev) => {
  if (prev?.previewUrl && typeof URL !== "undefined" && prev.previewUrl.startsWith("blob:")) {
    URL.revokeObjectURL(prev.previewUrl);
  }

  return {
    file: null,
    previewUrl: "",
    storagePath: "",
    isUploaded: false,
    sourceType: "",
    uploadedAt: null,
  };
};
