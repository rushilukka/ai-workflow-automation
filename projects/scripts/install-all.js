#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectsDir = __dirname.replace(/scripts$/, '');

/**
 * Find all directories containing package.json
 */
function findProjectDirs(dir) {
  const projects = [];
  
  function traverse(currentDir) {
    try {
      const files = fs.readdirSync(currentDir);
      
      // Check if package.json exists in current directory
      if (files.includes('package.json')) {
        // Exclude if it's the root projects folder's package.json (we want subdirectories)
        if (currentDir !== projectsDir) {
          projects.push(currentDir);
          return; // Don't traverse into subdirectories of a project with package.json
        }
      }
      
      // Traverse subdirectories
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        try {
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory() && !file.startsWith('.')) {
            traverse(fullPath);
          }
        } catch (e) {
          // Skip files that can't be read
        }
      });
    } catch (e) {
      // Skip directories that can't be read
    }
  }
  
  traverse(dir);
  return projects;
}

/**
 * Install packages in all projects
 */
function installAll() {
  const projects = findProjectDirs(projectsDir);
  
  if (projects.length === 0) {
    console.log('❌ No projects with package.json found');
    return;
  }
  
  console.log(`\n🔍 Found ${projects.length} project(s):\n`);
  projects.forEach(proj => console.log(`  - ${path.relative(projectsDir, proj)}`));
  console.log('\n📦 Installing packages...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  projects.forEach((projectDir, index) => {
    const projectName = path.relative(projectsDir, projectDir);
    
    try {
      console.log(`  [${index + 1}/${projects.length}] Installing: ${projectName}`);
      execSync('npm install', {
        cwd: projectDir,
        stdio: 'inherit',
        shell: true
      });
      console.log(`  ✅ ${projectName} installed\n`);
      successCount++;
    } catch (error) {
      console.error(`  ❌ Error installing ${projectName}: ${error.message}\n`);
      failCount++;
    }
  });
  
  console.log('\n📊 Installation Summary:');
  console.log(`  ✅ Successful: ${successCount}`);
  console.log(`  ❌ Failed: ${failCount}\n`);
}

installAll();
