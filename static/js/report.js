window.addEventListener("DOMContentLoaded", () => {
  // Inside the event listener for your pagination buttons (previous/next)
  let page = 1; // Get the page number from the button or link clicked

  fetch(`/report/${fundraiserId}/page/${page}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest", // Important Addition!
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Non-JSON response received");
      }
      return response.json();
    })
    .then((contributionsData) => {
      updateContributionsTable(contributionsData);
    })
    .catch((error) => console.error("Error fetching data:", error));

/**
 * Fetches contributions data from the server based on the specified page number.
 *
 * @param {number} page - The page number to fetch contributions data from.
 * @return {Promise} A promise that resolves to the contributions data.
 */
  function fetchContributionsData(page) {
    fetch(`/report/${fundraiserId}/page/${page}`)
      .then((response) => response.json())
      .then((contributionsData) => {
        updateContributionsTable(contributionsData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});

  // Implement PDF download functionality
  try {
    const downloadPdfButton = document.querySelector('#download-pdf');
    if (downloadPdfButton) {
      downloadPdfButton.addEventListener('click', () => {
        const jsPdf = new jsPDF();

        // Add header (ensure fundraiser variable is available here)
        setHeader({
          html: `
            <h1>Fundraiser Report</h1>
            <p>Fundraiser: ${fundraiser.name}</p>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
          `
        });

        // Add footer (will be repeated on every page)
        setFooter({
          html: `
            <p>Page ${internal.getNumberOfPages()}</p>
            <p>Generated by https://www.nijenge.co.ke</p>
          `
        });

        const table = document.querySelector('#contributions-table');
        html(table, {
          callback: (doc) => {
            doc.save('contributions.pdf');
          }
        });
      });
    } else {
      console.warn('Button with ID #download-pdf not found. PDF download functionality disabled.');
    }
  } catch (error) {
    console.error('Error with PDF download functionality:', error);
  }

function updateContributionsTable(contributionsData) {
  const contributionsTable = document.querySelector("#contributions-table tbody");
  contributionsTable.innerHTML = ""; // Clear existing rows

  if (contributionsData.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = '<td colspan="6">No contributions found</td>';
    contributionsTable.appendChild(row);
    return;
  }

  contributionsData.forEach(contribution => {
    // Check for duplicate reference before appending
    if (!contributionsTable.querySelector(`[data-contribution-reference="${contribution.contribution_reference}"]`)) {
      const formattedContribution = { ...contribution }; // Create a copy for formatting

      // Format amount as currency
      formattedContribution.amount = formattedContribution.amount.toLocaleString('en-KE', {
        style: 'currency',
        currency: 'KES'
      });

      // Format dates
      try {
        formattedContribution.contribution_date = new Date(contribution.contribution_date).toLocaleDateString();
        formattedContribution.contribution_time = new Date(contribution.contribution_time).toLocaleTimeString();
      } catch (error) {
        console.error('Error parsing date:', error);
        // Handle the error as needed
      }

      // Create table row
      const contributionRow = document.createElement('tr');
      contributionRow.innerHTML = `
        <td>${formattedContribution.contribution_reference}</td>
        <td>${formattedContribution.contributor_name}</td>
        <td>${formattedContribution.amount}</td>
        <td>${formattedContribution.contribution_date}</td>
        <td>${formattedContribution.contribution_time}</td>
        <td>${formattedContribution.timestamp}</td>
      `;
      contributionsTable.appendChild(contributionRow);
    }
  });
}