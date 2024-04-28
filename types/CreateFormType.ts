import * as DocumentPicker from 'expo-document-picker';

export type File = DocumentPicker.DocumentPickerAsset;

export type CreateFormType = {
  title: string;
  video: File | null;
  thumbnail: File | null;
  prompt: string;
  userId?: string;
};
