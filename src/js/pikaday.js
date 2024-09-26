import Pikaday from "pikaday";
const field = document.getElementById("datepicker-topright-forreal");
let picker = new Pikaday({
  field: field,
  position: "top right",
  reposition: true,
  container: document.body,
  format: "D/MMM/YYYY",
  toString(date) {
    const day = date.getDate();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  onSelect: function () {
    field.value = picker.toString();
  },
});
field.parentNode.insertBefore(picker.el, field.nextSibling);
