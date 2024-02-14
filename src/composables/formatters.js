const getSuffix = (day)=>{
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = day % 100
  return  suffixes[0] || suffixes[remainder] || suffixes[(remainder - 20) % 10]

}

export const useFormatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const ordinal = getSuffix(day);
    return `${day}${ordinal} of ${month}`;
    };