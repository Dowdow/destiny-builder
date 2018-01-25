export function loadState() {
  try {
    const serializeState = localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
    return true;
  } catch (err) {
    return err;
  }
}

export function subscribeLocalStorage(store) {
  store.subscribe(() => {
    saveState({
      buildHelmet: store.getState().buildHelmet,
      buildGauntlet: store.getState().buildGauntlet,
      buildChest: store.getState().buildChest,
      buildLegs: store.getState().buildLegs,
      buildClassArmor: store.getState().buildClassArmor,
      buildHelmetMod: store.getState().buildHelmetMod,
      buildGauntletMod: store.getState().buildGauntletMod,
      buildChestMod: store.getState().buildChestMod,
      buildLegsMod: store.getState().buildLegsMod,
      buildClassArmorMod: store.getState().buildClassArmorMod,
      buildHelmetMiniMod: store.getState().buildHelmetMiniMod,
      buildGauntletMiniMod: store.getState().buildGauntletMiniMod,
      buildChestMiniMod: store.getState().buildChestMiniMod,
      buildLegsMiniMod: store.getState().buildLegsMiniMod,
      buildClassArmorMiniMod: store.getState().buildClassArmorMiniMod,
      savedBuilds: store.getState().savedBuilds,
    });
  });
}
