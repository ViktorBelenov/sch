async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const element = document.querySelector('.favorite-taby');


    try {

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');


        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf');
    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
    }
}