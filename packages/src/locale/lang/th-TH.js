export default {
    pagination: {
        goto: "ไปที่หน้า",
        page: "หน้า",
        itemsPerPage: " / หน้า",
        total: (total) => `ทั้งหมด ${total}`,
        prev5: "5 หน้าก่อนหน้า",
        next5: "5 หน้าถัดไป",
    },
    table: {
        // filter
        confirmFilter: "ยืนยัน",
        resetFilter: "ล้าง",
        // contextmenu event
        cut: "ตัด",
        copy: "คัดลอก",
        insertRowAbove: "แทรก 1 แถวด้านบน",
        insertRowBelow: "แทรก 1 แถวด้านล่าง",
        removeRow: "ลบ $1 แถว",
        emptyRow: "ล้าง $1 แถว",
        //removeColumn: "ลบคอลัมน์",
        emptyColumn: "ล้าง $1 คอลัมน์",
        //hideColumn: "ซ่อนคอลัมน์",
        emptyCell: "ล้างเซลล์",
        leftFixedColumnTo: "ตรึงคอลัมน์ด้านซ้ายจนถึง",
        cancelLeftFixedColumnTo: "ยกเลิกการตรึงคอลัมน์ด้านซ้าย",
        rightFixedColumnTo: "ตรึงคอลัมน์ด้านขวาจนถึง",
        cancelRightFixedColumnTo: "ยกเลิกการตรึงคอลัมน์ด้านขวา",
    },
};
