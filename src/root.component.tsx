/**
 * From here, the application is pretty typical React, but with lots of
 * support from `@openmrs/esm-framework`. Check out `Greeter` to see
 * usage of the configuration system, and check out `PatientGetter` to
 * see data fetching using the OpenMRS FHIR API.
 *
 * Check out the Config docs:
 *   https://openmrs.github.io/openmrs-esm-core/#/main/config
 */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LeftNavMenu, setLeftNav, unsetLeftNav } from "@openmrs/esm-framework";
import Home from "./pages/home.component";
import Register from "./pages/register.component";
import styles from "./root.scss";

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useEffect(() => {
    setLeftNav({
      name: "christiano-left-panel-slot",
      basePath: spaBasePath,
    });
    return () => unsetLeftNav("christiano-left-panel-slot");
  }, [spaBasePath]);

  return (
    <BrowserRouter basename={`${window.getOpenmrsSpaBase()}christiano`}>
      <LeftNavMenu />
      <main className={styles.container}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
