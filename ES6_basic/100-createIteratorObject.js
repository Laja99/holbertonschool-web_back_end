export default function createIteratorObject(report) {
  const allEmployees = [];

  for (const departmentEmployees of Object.values(report.allEmployees)) {
    allEmployees.push(...departmentEmployees);
  }

  return allEmployees;
}
