import 'jsonforms';
import './jsonforms_ecore';
import './link.renderer'
import {JsonForms } from 'jsonforms';

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   const uischemas = JSON.parse(this.responseText);
   register(uischemas.attribute_view, "http://www.eclipse.org/emf/2002/Ecore#//EAttribute");
   register(uischemas.eclass_view, "http://www.eclipse.org/emf/2002/Ecore#//EClass");
   register(uischemas.datatype_view, "http://www.eclipse.org/emf/2002/Ecore#//EDataType");
   register(uischemas.enum_view, "http://www.eclipse.org/emf/2002/Ecore#//EEnum");
   register(uischemas.epackage_view, "http://www.eclipse.org/emf/2002/Ecore#//EPackage");
   register(uischemas.reference_view, "http://www.eclipse.org/emf/2002/Ecore#//EReference");

  }
};
xhttp.open("GET", "http://localhost:3001/uischema.json", true);
xhttp.send();

const register = (uischema, uri) => {
  JsonForms.uischemaRegistry.register(uischema, (schema, data) =>
    data.eClass === uri || schema.properties!==undefined && schema.properties.eClass!==undefined
    && schema.properties.eClass.default===uri? 2 : -1);
}
window.onload =() => {
  const dataURL = "http://localhost:3004/ecore";
  // const dataURL = "http://localhost:3004/task";
  const ecore = document.createElement('jsonforms-ecore');
  const saveDataButton = document.getElementById('saveData');
  saveDataButton.onclick = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    };
    xhttp.open("PUT", dataURL, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(ecore['data']));
  };
  const loadData = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        window['ecore-data'] = data;
        ecore['data'] = data;
        document.body.appendChild(ecore);
      }
    };
    xhttp.open("GET", dataURL, true);
    xhttp.send();
  };
  loadData();
}
