<?php

require_once("dbHandler.php");
$db = new DbHandler();
$result = $db->getAllRecords("SELECT user_name, email FROM event_guests");

require('fpdf/fpdf.php');
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(40, 12, "No", 1);
$pdf->Cell(75, 12, "Name", 1);
$pdf->Cell(75, 12, "Email", 1);
$no = 0;
foreach ($result as $row) {
    $no++;
    $pdf->SetFont('Arial', '', 12);
    $pdf->Ln();
    $pdf->Cell(40, 12, $no, 1);

    foreach ($row as $column) {
        $pdf->Cell(75, 12, $column, 1);
    }
}
$pdf->Output();
?>