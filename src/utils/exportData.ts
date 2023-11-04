import { StudentImport } from "@/apis/models/StudentImport";
import { read, utils } from "xlsx";

function arrayToObject(dataArray: any) {
  const students = ref<StudentImport[]>([]);

  for (let row = 1; row < dataArray.length; row++) {
    students.value?.push({
      userId: dataArray[row][0] ?? null,
      name: dataArray[row][1] ?? null,
      password: dataArray[row][2] ?? null,
      email: dataArray[row][3] ?? null,
      moduleType: dataArray[row][4] ?? null,
    });
  }

  return students;
}

export function exportData(file: File[]) {
  const reader = new FileReader();
  const dataExport = ref();

  const students = ref<StudentImport[]>([]);

  reader.onload = () => {
    const fileData = reader.result;

    const wb = read(fileData, { type: "binary" });

    const wsname = wb.SheetNames[0];

    const ws = wb.Sheets[wsname];
    const data = utils.sheet_to_json(ws, { header: 1 });
    // console.log(data);
    dataExport.value = data;
  };
  reader.readAsBinaryString(file[0]);

  return dataExport;
}
