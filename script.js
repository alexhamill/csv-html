

async function fetchCSV() {
  const response = await fetch('https://raw.githubusercontent.com/alexhamill/csv-html/refs/heads/main/schdule.csv');
  const csvData = await response.text();
  console.log(csvData);

  const rows = csvData.trim().split('\n');
  console.log(rows);

  const classData = rows.map(row => {
    const [name, blocks] = row.split(',');
    return {
      name: name.trim(),
      blocks: blocks.split(';').map(block => block.trim())
    };
  });
  console.log(classData);
  return classData;
}

function makeDiv(data){
  if (Array.isArray(data)) {
    data.forEach(element => {
      let p = document.createElement('p');
      p.innerHTML = element.name  + element.blocks.join(', ');
      document.body.appendChild(p); // Append the <p> element to the body or another parent element
      console.log("made");
    });
  } else {
    console.error("Invalid data: Expected an array, but got", data);
  }
}

(async function() {
  let data = await fetchCSV();
  console.log(data);
  makeDiv(data);
})();





