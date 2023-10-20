import { Page, Target } from 'puppeteer';

const waitForNewTab = async (action: () => Promise<unknown>) => {
  const [newTarget]: any = await Promise.all([
    new Promise((resolve) => {
      browser.on('targetcreated', function onTargetCreated(target: Target) {
        if (target.type() === 'page') {
          browser.off('targetcreated', onTargetCreated)
          resolve(target);
        }
      });
    }),
    action(),
  ]);
  return await newTarget.page() as Page;
}

export default waitForNewTab;
