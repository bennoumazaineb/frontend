function configs(labels, datasets) {
  const data = {
    labels: labels || [], // Utilisez labels ou un tableau vide par défaut
    datasets: datasets.map((dataset) => ({
      label: dataset.label || '', // Assurez-vous que le label est défini ou vide par défaut
      tension: 0.1,
      borderWidth: 0,
      borderRadius: 100,
      borderSkipped: false,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Couleur de fond blanche par défaut
      data: dataset.data || [], // Utilisez dataset.data ou un tableau vide par défaut
      maxBarThickness: 8,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: 'rgba(255, 255, 255, .2)',
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 500,
          beginAtZero: true,
          padding: 10,
          font: {
            size: 14,
            weight: 300,
            family: 'Roboto',
            style: 'normal',
            lineHeight: 2.5,
          },
          color: '#fff',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: 'rgba(255, 255, 255, .2)',
        },
        ticks: {
          display: true,
          color: '#f8f9fa',
          padding: 10,
          font: {
            size: 12,
            weight: 300,
            family: 'Roboto',
            style: 'normal',
            lineHeight: 1,
          },
        },
      },
    },
  };

  return { data, options };
}

export default configs;
