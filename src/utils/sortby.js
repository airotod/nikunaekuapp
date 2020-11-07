export function sortByDate(items) {
  items.sort(function (a, b) {
    if (a.date > b.date) {
      return 1;
    } else if (a.date < b.date) {
      return -1;
    }
    return 0;
  });

  return items.reverse();
}

export function sortByBrandName(items) {
  items.sort(function (a, b) {
    if (a.brandName > b.brandName) {
      return 1;
    } else if (a.brandName < b.brandName) {
      return -1;
    }
    return 0;
  });

  return items;
}

export function sortByPrice(items) {
  items.sort(function (a, b) {
    if (a.price > b.price) {
      return 1;
    } else if (a.price < b.price) {
      return -1;
    }
    return 0;
  });

  return items;
}
