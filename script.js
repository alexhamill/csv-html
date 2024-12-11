async function fetchCSV() {
  const response = await fetch('https://raw.githubusercontent.com/alexhamill/csv-html/refs/heads/main/schdule.csv');
  //const response = await fetch('https://raw.githubusercontent.com/ArenaPlanning/ArenaPlanning.github.io/refs/heads/main/schedule.csv');
  const csvData = await response.text();
  console.log(csvData);
  const rows = csvData.trim().split('\n').map(row => row.split(','));


  const classData = {};
  rows.forEach(row => {
    const classCode = row[0];
    const periods = row[1].split(';');
    classData[classCode] = periods;
  });
  console.log(classData);
  return classData;
}
fetchCSV();
