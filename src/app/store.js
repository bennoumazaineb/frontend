import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../feature/project/projectSlice";
import recReducer from "../feature/reclamation/recSlice";
import taskReducer from '../feature/tache/tacheSlice'
import reuReducer from '../feature/reunion/reuSlice';
import authReducer from '../feature/auth/authSlice';
import templateReducer from '../feature/template/templateSlice';
import uploadReducer from '../feature/upload/uploadSlice'
import page1Reducer from "../feature/page1/page1Slice"
import page2Reducer from "../feature/page2/page2Slice"
import page3Reducer from "../feature/page3/page3Slice"
import commentaireReducer from "../feature/commentaire/commentaireSlice"
import historiqueReducer from "../feature/historique/historiqueSlice";
import avisReducer from "../feature/avis/avisSlice"; // Correction de l'import
import factureReducer from "../feature/facture/factureSlice"
import upload2Reducer from "../feature/upload2/uploadSlice"
export const store = configureStore({
    reducer: {
      project: projectReducer,
      rec: recReducer,
      task: taskReducer,
      reu: reuReducer,
      auth: authReducer,
      template: templateReducer,
      upload: uploadReducer,
      page1: page1Reducer,
      page2: page2Reducer,
      page3: page3Reducer,
      commentaire: commentaireReducer,
      historique: historiqueReducer,
      avis: avisReducer ,// Utilisation du reducer correct pour 'avis'
      facture:factureReducer,
      upload2:upload2Reducer,

   
    },
});
