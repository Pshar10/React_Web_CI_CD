const getShortDesc = (desc: string): string => {
  return desc.length > 85 ? desc.split(".")[0].slice(0, 80) + "..." : desc;
};

export default getShortDesc;
