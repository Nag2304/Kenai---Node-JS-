document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('submit-btn');
  const itemNumberInput = document.getElementById('item-number');
  const branchPlantInput = document.getElementById('branch-plant');
  const dataContainer = document.getElementById('data-container');

  submitBtn.addEventListener('click', function () {
    const itemNumber = itemNumberInput.value.trim();
    const branchPlant = branchPlantInput.value.trim();

    if (!itemNumber || !branchPlant) {
      clearData();
      alert('Please enter both Item Number and Branch Plant.');
      return;
    }

    fetchData(itemNumber, branchPlant);
  });

  function fetchData(itemNumber, branchPlant) {
    fetch('/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Clear previous data
        clearData();

        // Create table
        const table = document.createElement('table');

        // Create header row
        const headerRow = document.createElement('tr');
        const headers = [
          'Item',
          'Branch Plant',
          'Lot/Serial',
          'Location',
          'On Hand',
          'Available',
        ];
        headers.forEach((headerText) => {
          const th = document.createElement('th');
          if (headerText == 'Item') {
            th.textContent = 'Item Number';
          } else if (headerText == 'Lot/Serial') {
            th.textContent = 'Lot Serial Number';
          } else if (headerText == 'On Hand') {
            th.textContent = 'On Hand Qty';
          } else if (headerText == 'Available') {
            th.textContent = 'Available Qty';
          } else {
            th.textContent = headerText;
          }

          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Helper function to handle various representations of null
        const isNull = (value) =>
          value === null ||
          value === 'null' ||
          value === undefined ||
          value === '';

        // Filter rows
        const filteredRows = data.FORM_TestItemAvail_1_319.rowset.filter(
          (row) => {
            const rowItemNumber = data.Item_Number.trim();
            const rowBranchPlant = data.Branch_Plant.trim();
            return (
              rowItemNumber === itemNumber && rowBranchPlant === branchPlant
            );
          }
        );

        if (filteredRows.length === 0) {
          alert('No matching records found.');
          return;
        }

        // Populate rows
        filteredRows.forEach((row) => {
          const tr = document.createElement('tr');

          // Create cells for Item and Branch Plant
          const itemCell = document.createElement('td');
          itemCell.textContent = data.Item_Number || '';
          tr.appendChild(itemCell);

          const branchPlantCell = document.createElement('td');
          branchPlantCell.textContent = data.Branch_Plant || '';
          tr.appendChild(branchPlantCell);

          // Create cells for each header in row data
          headers.slice(2).forEach((headerText) => {
            const td = document.createElement('td');
            td.textContent = isNull(row[headerText]) ? '' : row[headerText]; // Display blank space for null values
            tr.appendChild(td);
          });

          table.appendChild(tr);
        });

        dataContainer.appendChild(table);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('There was a problem fetching the data. Please try again later.');
      });
  }

  function clearData() {
    dataContainer.innerHTML = '';
  }
});
