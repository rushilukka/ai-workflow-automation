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
 * Uninstall node_modules and package-lock.json from all projects
 */
function uninstallAll() {
  const projects = findProjectDirs(projectsDir);
  
  if (projects.length === 0) {
    console.log('❌ No projects with package.json found');
    return;
  }
  
  console.log(`\n🔍 Found ${projects.length} project(s):\n`);
  projects.forEach(proj => console.log(`  - ${path.relative(projectsDir, proj)}`));
  console.log('\n🗑️  Uninstalling node_modules...\n');
  
  projects.forEach(projectDir => {
    const projectName = path.relative(projectsDir, projectDir);
    const nodeModulesPath = path.join(projectDir, 'node_modules');
    const lockFilePath = path.join(projectDir, 'package-lock.json');
    
    try {
      // Remove node_modules directory
      if (fs.existsSync(nodeModulesPath)) {
        console.log(`  📁 Removing node_modules: ${projectName}`);
        execSync(`rmdir /s /q "${nodeModulesPath}"`, { stdio: 'pipe', shell: true });
      }
      
      // Remove package-lock.json
      if (fs.existsSync(lockFilePath)) {
        console.log(`  🔒 Removing package-lock.json: ${projectName}`);
        fs.unlinkSync(lockFilePath);
      }
      
      console.log(`  ✅ ${projectName} cleaned\n`);
    } catch (error) {
      console.error(`  ❌ Error cleaning ${projectName}: ${error.message}\n`);
    }
  });
  
  console.log('✨ Uninstall complete!\n');
}

uninstallAll();
