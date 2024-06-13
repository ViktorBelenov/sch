async function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Получите элемент HTML, который нужно преобразовать в PDF
    const element = document.querySelector('.favorite-taby');


    try {
        // Используйте html2canvas для захвата содержимого элемента
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        // Создайте новый документ jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Добавьте изображение в PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf');
    } catch (error) {
        console.error('Ошибка при создании PDF:', error);
    }
}