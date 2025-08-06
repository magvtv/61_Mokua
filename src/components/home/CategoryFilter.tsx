import React, { useState } from 'react';
import {
  Box,
  Chip,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
  showCounts?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showCounts = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      onCategoryChange(null); // Deselect if already selected
    } else {
      onCategoryChange(categorySlug);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          mb: 2,
          color: 'text.primary',
        }}
      >
        Filter by Category
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Chip
            label="All"
            onClick={() => onCategoryChange(null)}
            variant={selectedCategory === null ? 'filled' : 'outlined'}
            sx={{
              bgcolor: selectedCategory === null ? 'primary.main' : 'transparent',
              color: selectedCategory === null ? 'white' : 'primary.main',
              borderColor: 'primary.main',
              fontWeight: 500,
              '&:hover': {
                bgcolor: selectedCategory === null ? 'primary.dark' : 'primary.main',
                color: 'white',
              },
            }}
          />
        </motion.div>

        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Chip
              label={
                showCounts && category.count !== undefined
                  ? `${category.name} (${category.count})`
                  : category.name
              }
              onClick={() => handleCategoryClick(category.slug)}
              variant={selectedCategory === category.slug ? 'filled' : 'outlined'}
              sx={{
                bgcolor: selectedCategory === category.slug ? category.color : 'transparent',
                color: selectedCategory === category.slug ? 'white' : category.color,
                borderColor: category.color,
                fontWeight: 500,
                '&:hover': {
                  bgcolor: selectedCategory === category.slug ? category.color : category.color,
                  color: 'white',
                },
              }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilter; 