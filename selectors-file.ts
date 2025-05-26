import { Page } from '@playwright/test'
// selectors-file.ts - Centralise tous les sélecteurs et constantes pour les tests

export const pageSelectors = {
  // Boutons de navigation et menus
  viewModuleButton: 'button:has-text("view_module")',
  viewListButton: 'button:has-text("view_list")',
  universesButton: 'button[name="Universes"]',
  assetsButton: 'button:has-text("Assets")',
  interactiveRoomButton: 'button.space-selection__select-trigger:has-text("Interactive room")',
  statusButton: 'button[name="Status"]',
  layerButton: 'button[name="Layer"]',

  // Tables et listes
  universeListItem: '.universe-list-item',
  assetsListTable: '.assets-list-table__add-button',
  virtuosoScroller: '[data-testid="virtuoso-scroller"]',

  // Éléments spécifiques
  stargazerLogo: 'a.header__title > img[alt*="Stargazer logo"]',
  editableTextUniverseName: 'input.editable-text.universe-name',
  activateDrawModeButton: 'button.add-star-button[aria-label="Activate draw mode to create a Star"]',
  deleteAssetButton: '[aria-label="Delete asset"]',
  editAssetPanel: '[aria-label="Edit asset"]',
  applyToAllButton: 'button.button.transparent.medium:has-text("Apply to all")',

  // Menus et actions
  openUniverseMenu: '[aria-label="Open Universe menu"]',
  openAssetMenu: '[aria-label="Open Asset menu"]',

  // Éléments de contenu
  thumbnailTag: 'span.tag.layer-tag:has-text("Thumbnail")',
  starTag: 'span.tag.layer-tag:has-text("Star")',
  contentTag: 'span.tag.layer-tag:has-text("Content")',
  backgroundTag: 'span.tag.layer-tag:has-text("Background")',

  // États de publication
  publishedText: ':text-is("Published")',
  unpublishedText: ':text-is("Unpublished")',
  archivedText: ':text-is("Archived")',

  // Éléments modaux
  confirmButton: 'text=Confirm',
  createButton: 'text=Create',

  // Error text
  archiveSuccessMessage: 'text=Asset archived successfully'
}
//Example univers name
export const universeNames = {
  melanie: 'Mélanie',
  ayoub: 'Ayoub',
  alloua: 'Alloua',
  aiTimeline: 'AI Timeline',
  copyAyoub: 'Copy of Ayoub'
}
//Space name
export const roomNames = {
  lobby: 'Lobby',
  loggia: 'Loggia',
  interactiveroom: 'InteractiveRoom'
}
//Layer type
export const layerTypes = {
  star: 'button:has-text("New Star")',
  thumbnail: 'Thumbnail',
  background: 'Background',
  content: 'Content'
}
//Asset type
export const assetTypes = {
  image: 'Image',
  video: 'Video',
  pdf: 'PDF'
}
//Univers Status
export const statusTypes = {
  published: 'Published',
  unpublished: 'Unpublished',
  archived: 'Archived'
}
//Galaxy number
export const galaxyOptions = {
  galaxy3: 'Galaxy 3',
  galaxy2: 'Galaxy 2'
}

export const testUrls = {
  imageUrl: 'https://unsplash.com/fr/photos/une-image-floue-de-cubes-sur-fond-rose-et-bleu-mKG3nYgEVIY',
  universeExportUrl: 'http://localhost:3000/universe/export/65784077353c9c4b190259ca'
}
// Wainting time
export const waitTimes = {
  short: 500,
  medium: 1000,
  long: 3000,
  veryLong: 5000
}
// Scroll
export const SCROLL_ACTIONS = {
  scrollVirtuoso: async (page: Page, scrollAmount: number) => {
    await page.evaluate((amount) => {
      const scroller = document.querySelector('[data-testid="virtuoso-scroller"]')
      if (scroller) {
        scroller.scrollTop += amount
      }
    }, scrollAmount)
  }
}

// Scrolle amounts
export const scrollAmounts = {
  small: 500,
  medium: 1000,
  large: 2000
}

// Éléments de texte constants pour vérification
export const textStrings = {
  universeListHeader: 'UniversesAssetssearchsort_by_alphaview_listStatusarrow_drop_downNameStatusModifi',
  universeModuleHeader: 'UniversesAssetssearchsort_by_alphaview_moduleStatusarrow_drop_downaddNew',
  assetListHeader: 'UniversesAssetssearchsort_by_alphaview_listLayerarrow_drop_downNameLayerURLDescr',
  sizePositionText: 'Size & PositionXYWH',
  imageStar: '1imageStar_0linkremove',
  youtubeLink: '2Ailinkremove',
  pdfLink: ': A Breakthrough Year for Deep Learninglinkremove',
  emptyAdd: '2Emptyadd',
}
