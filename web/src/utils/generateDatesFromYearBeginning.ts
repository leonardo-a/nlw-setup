import dayjs from "dayjs";


export function generateDatesFromYearBeginning() {
    const firstDateYear = dayjs().startOf("year");
    const today = dayjs();

    const dates = [];
    let compareDate = firstDateYear;

    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }

    return dates;

}