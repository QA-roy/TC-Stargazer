import { type Browser, expect, type Page, test } from '@playwright/test'
import { chromium } from 'playwright-extra'
import { configData, routes } from '../mock/data'
import { expectURL } from '../utils/result'
import { locator } from '../utils/ui'
import { selectors } from '../utils/global-selectors'
import { defineConfig } from '@playwright/test';

test.describe.serial('Admin', () => {
    let browser: Browser, page: Page
  
    test.beforeEach(async () => {
      browser = await chromium.launch({ headless: false })
      page = await browser.newPage({
        storageState: configData.adminStorage
      })
    })
  
    test.afterAll(async () => {
      await page.close();
    })

      test('TC-VIEW-001_View universe list or module', async () => {
        await page.goto(configData.adminUrl);
        await page.locator('button').filter({ hasText: 'view_module' }).click();
        await page.waitForTimeout(1500);
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listStatusarrow_drop_downNameStatusModifi')).toBeVisible();
        await page.locator('button').filter({ hasText: 'view_list' }).click();
        await page.waitForTimeout(1500);
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_moduleStatusarrow_drop_downaddNew')).toBeVisible();
      })
      test('TC-VIEW-002_View assets all items', async () => {
        await page.goto(configData.adminUrl);
        await page.getByRole('button', { name: 'Assets' }).click();
        await expect(page.locator('.tag').first()).toBeVisible();
        await expect(page.getByText('photo_printsThumbnail')).toBeVisible();
        await expect(page.getByText('wallpaperBackground')).toBeVisible();
        await expect(page.getByText('imageContent').first()).toBeVisible();
      })
      test('TC-CONT-001_Add a star and check its display', async () => {
        await page.goto(configData.adminUrl);
        await page.getByRole('button', { name: 'Assets' }).click();
        await page.locator('.assets-list-table__add-button').click();
        await page.getByLabel('Name *').fill('A');
        await page.getByLabel('Select a layer *').click();
        await page.getByRole('option', { name: 'Star' }).locator('div').first().click();
        await page.getByLabel('Select a type *').click();
        await page.getByRole('option', { name: 'Image' }).locator('div').first().click();
        await page.getByLabel('URL *').click();
        await page.getByLabel('URL *').fill('https://unsplash.com/fr/photos/une-image-floue-de-cubes-sur-fond-rose-et-bleu-mKG3nYgEVIY');
        await page.getByLabel('Description').click();
        await page.getByLabel('Description').fill('A');
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listLayerarrow_drop_downNameLayerURLDescr')).toBeVisible();
        await page.getByText('Create', { exact: true }).click();
        await expectURL(page, routes.adminHome);
        await expect(page.getByText('UniversesAssetssearchsort_by_alphaview_listLayerarrow_drop_downNameLayerURLDescr')).toBeVisible();
      }) 
      //test('TC-CONT-002_Archived different types of content', async () => {
        //await page.goto(configData.adminUrl);
        //await page.getByRole('button', { name: 'Assets' }).click();
        //await expect(page.getByRole('cell', { name: '?' })).toBeVisible();
        //await page.getByRole('row', { name: '? Star iso.org/fr...uoi-ia' }).getByLabel('Open Asset menu').click();
        //await page.getByText('archiveArchive').click();
        //await page.getByText('Confirm', { exact: true }).click();
        //await page.waitForSelector('text=Asset archived successfully', { state: 'visible', timeout: 5000 });
        //await expect(page.getByRole('row', { name: '? Star iso.org/fr...uoi-ia' })).not.toBeVisible();
            //Test fails, because it is not possible to immediately check archived content, pending correction on the new version
      //})

      test('TC-UNIV-010.1_Filter universe list (Unpublished)', async () => {
        await page.goto(configData.adminUrl);
        await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible();
        await page.getByRole('button', { name: 'Status' }).click();
        await page.getByLabel('Statusarrow_drop_down').getByText('Unpublished').click();
        const universeListItems = await page.$$('.universe-list-item');
        for (const item of universeListItems) {
          
          const publishedElement = await item.$(':text-is("Published")');
          await expect(publishedElement).toBeNull();
  
          const archivedElement = await item.$(':text-is("Archived")');
          await expect(archivedElement).toBeNull();

          const unpublishedElement = await page.getByText('Unpublished');
          await expect(unpublishedElement).toBeVisible();
      }
        await page.waitForTimeout(1000);
      })

      test('TC-UNIV-010.2_Filter universe list(Archived)', async () => {
        await page.goto(configData.adminUrl);
        await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible();
        await page.getByRole('button', { name: 'Status' }).click();
        await page.getByLabel('Statusarrow_drop_down').getByText('Archived').click();
        const universeListItems = await page.$$('.universe-list-item');
        for (const item of universeListItems) {
          
          const publishedElement = await item.$(':text-is("Published")');
          await expect(publishedElement).toBeNull();
  
          const unpublishedElement = await page.getByText('Unpublished');
          await expect(unpublishedElement).toBeNull();

          const archivedElement = await item.$(':text-is("Archived")');
          await expect(archivedElement).toBeVisible();
      }
        await page.waitForTimeout(1000);
      })
      test('TC-UNIV-010.3_Filter universe list(Published)', async () => {
        await page.goto(configData.adminUrl);
        await expect(page.getByRole('button', { name: 'Universes' })).toBeVisible();
        await page.getByRole('button', { name: 'Status' }).click();
        await page.waitForTimeout(500);
        await page.getByRole('menuitem', { name: 'Published', exact: true }).click();
        const universeListItems = await page.$$('.universe-list-item');
        for (const item of universeListItems) {
          
          const archivedElement = await item.$(':text-is("Archived")');
          await expect(archivedElement).toBeNull();
  
          const unpublishedElement = await page.getByText('Unpublished');
          await expect(unpublishedElement).toBeNull();

          const publishedElement = await item.$(':text-is("Published")');
          await expect(publishedElement).toBeVisible();
      }
        await page.waitForTimeout(1000);
      })    
    test('TC-SPAC-001.1_Select room Lobby and verify universes', async () => {
        // Naviguer et interagir avec l'interface
        await page.goto(configData.adminUrl);
        await page.getByRole('button', { name: 'Interactive room' }).click();
        await page.getByRole('menuitem', { name: 'Lobby' }).click();
        async function verifierElementsPresents(page: Page): Promise<void> {
          const element1Present = await page.getByLabel('123').getByText('photo_prints').isVisible();
          const element2Present = await page.getByLabel('GenAI').getByText('photo_prints').isVisible();
          expect(element1Present).toBe(true);
      expect(element2Present).toBe(true);
      await expect(page).toHaveURL(/.*\/paris\/lobby\/$/);
      }
    })
    test('TC-SPAC-001.2_Select room Loggia and verify universes', async () => {
      await page.goto(configData.adminUrl);
      await page.getByRole('button', { name: 'Interactive room' }).click();
      await page.getByRole('menuitem', { name: 'Loggia' }).click();
      async function verifierElementsPresents(page: Page): Promise<void> {
        const element1Present = await page.getByLabel('Test Création').getByText('photo_prints').isVisible();
        const element2Present = await page.getByLabel('Tivoli').getByText('photo_prints').isVisible();
        expect(element1Present).toBe(true);
        expect(element2Present).toBe(true);
        await expect(page).toHaveURL(/.*\/paris\/loggia\/$/);
      }
    })
    test('TC-PARA-001_Applicate background all project', async () => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 1000; // Fais défiler de 1000 pixels vers le bas pour trouver mon élément
            // Tu peux aussi utiliser scroller.scrollBy(0, 500);
          }
        });
        // Attendre un court instant pour que le défilement se termine
        await page.waitForTimeout(500);
        await page.getByText('Mélanie').click();
        await page.getByText('wallpaperBackground').click();
        await page.getByRole('button', { name: 'Apply to all' }).click();
        await expect(page.getByLabel('Edit asset')).toBeVisible();
        await page.getByRole('button', { name: 'Galaxies' }).click();
        await page.getByRole('button', { name: 'Galaxies' }).click();
        await page.getByRole('option', { name: 'Galaxy 3' }).click();
      });
      
      test('TC-PARA-002_Appicate content all project', async () => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 1000; // Fais défiler de 1000 pixels vers le bas pour trouver mon élément
          }
        });
        await page.getByText('Mélanie').click();
        await page.getByText('imageContent').click();
        await page.getByRole('button', { name: 'Apply to all' }).click();
        await expect(page.getByLabel('Edit asset')).toBeVisible();
        await page.getByRole('button', { name: 'Galaxies' }).click();
        await page.getByRole('button', { name: 'Galaxies' }).click();
        await page.getByRole('option', { name: 'Galaxy 3' }).click();
        await expect(page.getByLabel('Edit asset')).toBeVisible();
      })
      
      test('TC-STAR-001_Add, move and resize a star', async () => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 500;
          }
        });
        await page.getByText('Ayoubmore_vert', { exact: true }).click();
        await page.getByLabel('Activate draw mode to create').click();
        await page.getByRole('option', { name: 'New Star' }).locator('div').first().click();
        await expect(page.getByText('Size & PositionXYWH')).toBeVisible();
        await page.getByRole('button', { name: 'Resize New Star' }).click();
      })
      
      test('TC-STAR-002_Assoicated differently content has a star', async () => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 500;
          }
        });
        await page.getByText('Ayoubmore_vert', { exact: true }).click();
        await page.getByText('touch_appNew Star1').click();
        await expect(page.getByText('1imageStar_0linkremove')).toBeVisible();// lien vers une image
        await expect(page.getByText('2Ailinkremove')).toBeVisible();// lien vers une vidéo youtube
        await expect(page.getByText(': A Breakthrough Year for Deep Learninglinkremove')).toBeVisible();// lien vers fichier PDF
      })
      
    //test('TC-STAR-003_Remove a star and check the deletion of associated items', async () => {
      //await page.goto(configData.adminUrl);
     // await page.waitForTimeout(3000);
        // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
     // await page.evaluate(() => {
       // const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
       // if (scroller) {
         // scroller.scrollTop += 1000; // Fais défiler de 1000 pixels vers le bas pour trouver mon élément
       // }
     // });
     // await page.getByText('Mélanie').click();
     // await page.getByText('touch_appNew Star2').first().click();
     // await expect(page.getByText('2imageAlinkremove')).toBeVisible();
     // await page.getByLabel('Delete asset').click();
     // await expect(page.getByText('2Emptyadd')).toBeVisible();
        //Add the element after overwriting to be able to replay the test
     // await page.getByText('2Emptyadd').click();
     // await page.getByText('imageAtouch_appStarunsplash.').click();  
   // })
      
      test('TC-UNIV-001_Change the name of a universe', async () => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 1000;
          }
        });
        await page.getByText('Mélanie').click();
        await page.getByRole('textbox').fill('Mélanie1');
        await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click();
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 1000;
          }
        });
        await expect(page.getByText('Mélanie1')).toBeVisible();
        //Add the name after overwriting to be ableto replay the test
        await page.getByLabel('Mélanie1').click();
        await page.getByRole('textbox').fill('Mélanie');
        await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click();
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 1000;
          }
        });
        await expect(page.getByText('Mélanie')).toBeVisible();
      })
      
      test('TC-UNIV-003_ Lock and unlock universes', async() => {
        await page.goto(configData.adminUrl);
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 500;
          }
        });
        await expect(page.getByText('Alloua')).toBeVisible();
        await page.getByText('Allouamore_vert').click();
        await page.locator('button span:has-text("lock")').click();
        await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click();
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 500;
          }
        });
        
        await expect(page.getByText('Alloua')).toBeVisible();
        //restores to initial before changes
        await page.getByText('Allouamore_vert').click();
        await page.locator('button span:has-text("lock")').click();
        await page.getByRole('link', { name: 'Stargazer logo, the S letter' }).click();
        await page.waitForTimeout(3000);
        await page.evaluate(() => {
          const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
          if (scroller) {
            scroller.scrollTop += 500;
          }
        });
        await expect(page.getByText('Alloua')).toBeVisible();
      })
       //test('TC-UNIV-005_Duplicate univers', async () => {
      //  await page.goto(configData.adminUrl);
      //  await page.getByLabel('Ayoub', { exact: true }).getByLabel('Open Universe menu').click();
      //  await page.getByText('content_copyDuplicate').click();
      //  await page.waitForTimeout(3000);
       // Faire défiler l'élément avec l'attribut data-testid="virtuoso-scroller"
      //  await page.evaluate(() => {
      //    const scroller = document.querySelector('[data-testid="virtuoso-scroller"]');
      //    if (scroller) {
      //      scroller.scrollTop += 500; // Fais défiler de 1000 pixels vers le bas pour trouver mon élément
      //    }
      //  });
      //  await expect(page.getByText('Copy of Ayoubmore_vert')).toBeVisible();
      //});

      test('TC-UNIV-007_Download universes', async () => {
        await page.goto(configData.adminUrl);
        await page.getByLabel('AI Timeline', { exact: true }).getByLabel('Open Universe menu').click();
      
        const downloadUrl = 'http://localhost:3000/universe/export/65784077353c9c4b190259ca';
      
        const responsePromise = page.waitForResponse(async response => {
          return response.url() === downloadUrl && response.status() === 200;
        });
      
        const downloadPromise = page.waitForEvent('download');
        await page.getByText('Download Universe').click();
        const download = await downloadPromise;
        const response = await responsePromise;
      
        expect(response.status()).toBe(200);
        console.log(`Le téléchargement a réussi avec le statut : ${response.status()}`);
        console.log(`Fichier téléchargé : ${await download.suggestedFilename()}`);
        await download.delete(); // Nettoyer le fichier téléchargé
      });
      
      //test('TC-UNIV-008_Archived universe0', async ({ page }) => {
        //await page.goto(configData.adminUrl);
      
        // Aller à l'élément initial et l'archiver
        //await page.getByLabel('Copy of Ayoub', { exact: true }).getByLabel('Open Universe menu').click();
        //await page.getByText('Set status Archived').click();
        //await page.getByRole('button', { name: 'Status' }).click();
        //await page.getByText('Archived', { exact: true }).click();
      
        // Attendre que la version archivée de l'élément soit visible et interagir avec
        //const archivedRegex = /Copy of Ayoub \(Archived\)/;
        //await page.getByLabel(archivedRegex).locator('visible=true').first().getByLabel('Open Universe menu').click();
        //await page.getByRole('menuitem', { name: 'Unarchive' }).locator('div').first().click();
        //await page.locator('button').filter({ hasText: 'close' }).click();
      
        // Attendre que la version désarchivée de l'élément soit visible
        //const restoredLabel = 'Copy of Ayoub';
        //await expect(page.getByText(restoredLabel, { exact: true }).locator('visible=true')).toBeVisible();
      //});
      
      test('TC-UNIV-011_Filter assets list (Thumbnail)', async () => {
        await page.goto(configData.adminUrl);
        await page.getByRole('button', { name: 'Assets' }).click();
        await page.getByRole('button', { name: 'Layer' }).click();
        await page.getByText('Thumbnail', { exact: true }).click();
        await page.waitForTimeout(3000);
    
        const assetListItems = await page.$$('.space-page__main'); // Assurez-vous que ce sélecteur est correct
    
        for (const item of assetListItems) {
            const starTagElement = await item.$(':text-is("star")');
            await expect(starTagElement).toBeNull();
    
            const contantTagElement = await item.$(':text-is("contant")');
            await expect(contantTagElement).toBeNull();
    
            const backgroundTagElement = await item.$(':text-is("background")');
            await expect(backgroundTagElement).toBeNull();
        }
    
        // Vérifier qu'au moins un élément avec le tag "Thumbnail" est visible
        const isThumbnailVisible = await page.locator(':text-is("Thumbnail")').first().isVisible();
        await expect(isThumbnailVisible).toBe(true);
    });

      //test('TC-UNIV-012_Create new universes with complex alphanumeric name', async () => {
        //await page.goto(configData.adminUrl);
        //await page.getByText('New Universe').click();
        //await page.getByLabel('Name *').fill('1245467897dsfdfer-!+3.');
        //await page.getByText('Create', { exact: true }).click();
        //const universeNameInput = page.locator('input.editable-text.universe-name');  
      //})
})
  