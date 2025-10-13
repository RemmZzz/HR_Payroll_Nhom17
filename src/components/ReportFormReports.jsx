import React, { useState } from "react";
import "./ReportFormReports.scss";

export default function ReportFormReports() {
    const [reportType, setReportType] = useState("");
    const [format, setFormat] = useState("xlsx");

    return (
        <div className="report-container">
            <div className="card">
                <h2>1. Chọn Loại báo cáo và Định dạng</h2>

                <label>Loại Báo cáo</label>
                <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                >
                    <option value="">-- Chọn báo cáo --</option>
                    <option value="thu-nhap">Báo cáo Thu nhập / Bảng lương chi tiết</option>
                </select>

                <label>Định dạng Export</label>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="format"
                            value="xlsx"
                            checked={format === "xlsx"}
                            onChange={() => setFormat("xlsx")}
                        />
                        Excel (.xlsx)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="format"
                            value="pdf"
                            checked={format === "pdf"}
                            onChange={() => setFormat("pdf")}
                        />
                        PDF
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="format"
                            value="csv"
                            checked={format === "csv"}
                            onChange={() => setFormat("csv")}
                        />
                        CSV
                    </label>
                </div>
            </div>

            <div className="card">
                <h2>2. Thiết lập Bộ lọc</h2>

                <label>Khoảng thời gian</label>
                <div className="date-range">
                    <input type="date" defaultValue="2024-01-01" />
                    <input type="date" defaultValue="2024-09-30" />
                </div>

                <label>Phòng ban</label>
                <select>
                    <option>Tất cả phòng ban</option>
                    <option>Phòng IT</option>
                    <option>Phòng Nhân sự</option>
                    <option>Phòng Kế toán</option>
                </select>

                <button className="export-btn">🚀 EXPORT BÁO CÁO NGAY</button>
            </div>
        </div>
    );
}
