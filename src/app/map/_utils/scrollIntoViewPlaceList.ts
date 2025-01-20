const scrollIntoViewPlaceList = (
  selectedPlaceId: string | null,
  places: { id: string }[],
  placeRef: (HTMLDivElement | null)[],
) => {
  if (!selectedPlaceId) return;

  const index = places.findIndex((place) => place.id === selectedPlaceId);
  if (index !== -1 && placeRef[index]) {
    placeRef[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export default scrollIntoViewPlaceList;
