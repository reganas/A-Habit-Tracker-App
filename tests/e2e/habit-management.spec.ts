import { test, expect } from '@playwright/test'

async function addHabit(page: any, habitName: string) {
  await page.getByRole('button', { name: 'Add new habit' }).click();
  await page.getByRole('textbox', { name: 'Habit name' }).fill(habitName);
  
  try {
    await page.getByRole('textbox', { name: 'Habit name' }).press('Enter');
  } catch {
    await page.getByRole('button', { name: 'Add habit' }).click();
  }
}

test.describe('Habit Management', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should add a new habit successfully', async ({ page }) => {

    await addHabit(page, 'exercise')

    await expect(page.getByText('Habit added successfully')).toBeVisible();

    await page.waitForTimeout(3000)

    await expect(page.getByText('Habit added successfully')).not.toBeVisible();

    await expect(page.getByText('exercise')).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Habit name' })).not.toBeVisible();

    await expect(page.getByText('Completed: 0 / 1 | Left:')).toBeVisible();

  })

  test('should show error for duplicate habit name', async ({ page }) => {

  await addHabit(page, 'exercise')

  await page.getByRole('button', { name: 'Add new habit' }).click();

  await page.getByRole('textbox', { name: 'Habit name' }).click();

  await page.getByRole('textbox', { name: 'Habit name' }).fill('exercise');

  try {
    await page.getByRole('textbox', { name: 'Habit name' }).press('Enter');
  } catch {
    await page.getByRole('button', { name: 'Add habit' }).click();
  }

  await expect(page.getByText('A habit with this name already exists')).toBeVisible();

  await page.waitForTimeout(3000)

  await expect(page.getByText('A habit with this name already exists')).not.toBeVisible();

  })

  test('should complete a habit by clicking checkbox', async ({ page }) => {
  
    await addHabit(page, 'exercise')

    await expect(page.getByText('error_outline Habit not')).toBeVisible();

    await page.getByRole('checkbox', { name: 'Mark exercise as complete' }).check();
    
    await expect(page.getByText('error_outline Habit not')).not.toBeVisible();

    await expect(page.getByText('check_circle Completed for')).toBeVisible();

    await expect(page.getByText('Completed: 1 / 1 | Left:')).toBeVisible();
  })
  
  test('should edit a habit name', async ({ page }) => {
    
    await addHabit(page, 'exersise')
  
    await page.getByRole('button', { name: 'Edit exersise' }).click();

    await page.getByRole('textbox').click();

    await page.getByRole('textbox').fill('exercise');

    await page.getByRole('button', { name: 'OK' }).click();
    
    await expect(page.getByText('Habit updated successfully')).toBeVisible();
    
    await page.waitForTimeout(3000);

    await expect(page.getByText('Habit updated successfully')).not.toBeVisible();
  })

  test('should stop a habit name', async ({ page }) => {
    
    await addHabit(page, 'exercise')
  
    await page.getByRole('button', { name: 'Stop tracking exercise' }).click();

    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByText('Habit stopped successfully')).toBeVisible();
    
    await expect(page.getByText('exercise (Stopped)')).toBeVisible();
  })
  
})