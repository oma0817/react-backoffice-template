import React from "react";
import {
  RecoilRoot,
  useTransactionObservation_UNSTABLE as useTransactionObservation,
} from "recoil";

import { accessTokenState, refreshTokenState } from "../recoil/auth";

const PERSISTENT_ATOMS = [accessTokenState, refreshTokenState];

const initializeState = ({ set }) => {
  PERSISTENT_ATOMS.forEach((atom) => {
    const persistedState = localStorage.getItem(atom.key);
    if (persistedState) {
      set(atom, JSON.parse(persistedState).value);
    }
  });
};

function PersistenceObserver() {
  useTransactionObservation(({ atomValues, modifiedAtoms }) => {
    for (const modifiedAtom of modifiedAtoms) {
      localStorage.setItem(
        modifiedAtom,
        JSON.stringify({ value: atomValues.get(modifiedAtom) })
      );
    }
  });
  return null;
}

const PersistentRecoil = ({ children }) => {
  return (
    <RecoilRoot initializeState={initializeState}>
      <PersistenceObserver />
      {children}
    </RecoilRoot>
  );
};

export default PersistentRecoil;
