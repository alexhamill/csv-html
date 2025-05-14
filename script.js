

async function fetchCSV() {
  const response = await fetch('https://raw.githubusercontent.com/alexhamill/csv-html/refs/heads/main/classes.csv');
  const csvData = await response.text();
  console.log(csvData);

  const rows = csvData.trim().split('\n');
  console.log(rows);

  const classData = rows.map(row => {
    const [code ,name , blocks] = row.split(',');
    return {

      name: name.trim(),
      code: code.trim(),
      blocks: blocks.split(';').map(block => block.trim())

    };
  });
  console.log(classData);
  return classData;
}

function makeDiv(data){
  if (Array.isArray(data)) {
    let form = document.getElementById("container")
    data.forEach(element => {
      let input = document.createElement('input');
      input.type = "checkbox";
      input.name = "class";
      input.id = element.name;
      input.value = element.code;
      form.appendChild(input);
      let label = document.createElement('label');
      label.for = element.name;
      label.innerHTML = element.name;
      form.appendChild(label)
      let br = document.createElement('br');
      form.appendChild(br)
    });
    let submit = document.createElement("button");
    submit.type = "button";
    submit.onclick = ()=>generateSchedules();
    submit.innerHTML = "Generate Schedule Options";
    form.appendChild(submit)
  } else {
    console.error("Invalid data: Expected an array, but got", data);
  }
}

async function run() {
  let data = await fetchCSV();
  console.log(data);
  makeDiv(data);
};
run();





