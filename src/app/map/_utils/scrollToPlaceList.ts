const scrollToPlaceList = (refs: (HTMLDivElement | null)[]) => {
  refs.forEach((ref) => {
    if (ref) {
      ref.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
};
export default scrollToPlaceList;
