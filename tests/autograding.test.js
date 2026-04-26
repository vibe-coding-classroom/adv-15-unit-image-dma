/**
 * @file autograding.test.js
 * @brief Comprehensive Autograding Suite for ADV-15
 */

const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

describe('Project Structure & Compliance', () => {
    const rootDir = path.resolve(__dirname, '..');

    it('should have the optimized driver file', () => {
        const filePath = path.join(rootDir, 'src', 'cam_dma_optimized.cpp');
        expect(fs.existsSync(filePath)).to.be.true;
    });

    it('should have the performance audit documentation', () => {
        const filePath = path.join(rootDir, 'docs', 'PERFORMANCE_AUDIT.md');
        expect(fs.existsSync(filePath)).to.be.true;
    });

    it('should have the debug UI', () => {
        const filePath = path.join(rootDir, 'public', 'debug_ui', 'index.html');
        expect(fs.existsSync(filePath)).to.be.true;
    });

    it('should contain GDMA or DMA references in the optimized driver', () => {
        const filePath = path.join(rootDir, 'src', 'cam_dma_optimized.cpp');
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content.toLowerCase()).to.satisfy(c => c.includes('dma') || c.includes('gdma'));
    });

    it('should specify fb_count >= 2 in the optimized driver for double buffering', () => {
        const filePath = path.join(rootDir, 'src', 'cam_dma_optimized.cpp');
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).to.match(/fb_count\s*=\s*[2-9]/);
    });
});
