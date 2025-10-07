import React, { useMemo } from 'react';
import { Box, Typography, IconButton, Tooltip, Paper, useTheme, alpha, Dialog, DialogContent, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, Circle } from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { recentPosts } from '../../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarWidgetProps {
  initialDate?: Date;
  onDateClick?: (date: Date) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ initialDate, onDateClick }) => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = React.useState<Date>(initialDate ?? new Date());
  const [direction, setDirection] = React.useState<number>(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);

  const postDates = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of recentPosts) {
      try {
        const d = parseISO(post.publishedAt);
        const key = format(d, 'yyyy-MM-dd');
        map.set(key, (map.get(key) || 0) + 1);
      } catch {}
    }
    return map;
  }, []);

  const monthMatrix = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const days: Date[] = [];
    let day = weekStart;
    while (day <= weekEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0
    })
  };

  const calendarPaper = (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
        p: 3,
        bgcolor: 'background.paper',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <IconButton 
          size="small" 
          onClick={handlePrevMonth}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
          }}
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={format(currentMonth, 'yyyy-MM')}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'text.primary'
              }}
            >
              {format(currentMonth, 'MMMM yyyy')}
            </Typography>
          </motion.div>
        </AnimatePresence>

        <IconButton 
          size="small" 
          onClick={handleNextMonth}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) }
          }}
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>

      {/* Weekday Headers */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: 1, 
        mb: 1.5
      }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Box 
            key={`${d}-${i}`}
            sx={{ 
              textAlign: 'center', 
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            {d}
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: 1
      }}>
        {monthMatrix.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const key = format(day, 'yyyy-MM-dd');
          const postCount = postDates.get(key) || 0;
          const hasPost = postCount > 0;
          const isToday = isSameDay(day, new Date());
          
          const dayElement = (
            <motion.div
              whileHover={{ scale: hasPost || isToday ? 1.1 : 1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Box
                onClick={() => hasPost && onDateClick?.(day)}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1.5,
                  fontSize: '0.85rem',
                  fontWeight: hasPost ? 600 : 400,
                  position: 'relative',
                  cursor: hasPost ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  bgcolor: hasPost 
                    ? theme.palette.primary.main
                    : isToday 
                      ? alpha(theme.palette.primary.main, 0.1)
                      : 'transparent',
                  color: hasPost 
                    ? theme.palette.primary.contrastText
                    : inMonth 
                      ? 'text.primary' 
                      : 'text.disabled',
                  border: isToday && !hasPost ? `2px solid ${theme.palette.primary.main}` : 'none',
                  '&:hover': hasPost ? {
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  } : {}
                }}
              >
                {format(day, 'd')}
                {hasPost && postCount > 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      bgcolor: 'primary.contrastText',
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
                    }}
                  />
                )}
              </Box>
            </motion.div>
          );

          if (hasPost) {
            return (
              <Tooltip
                key={key}
                title={`${postCount} post${postCount > 1 ? 's' : ''} published`}
                placement="top"
                arrow
              >
                {dayElement}
              </Tooltip>
            );
          }

          return <Box key={key}>{dayElement}</Box>;
        })}
      </Box>

      {/* Legend */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mt: 3, 
        pt: 2, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Circle sx={{ fontSize: 8, color: theme.palette.primary.main }} />
          <Typography variant="caption" color="text.secondary">
            Published
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box 
            sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%',
              border: `2px solid ${theme.palette.primary.main}`,
              bgcolor: 'transparent'
            }} 
          />
          <Typography variant="caption" color="text.secondary">
            Today
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  if (isMobile) {
    return (
      <Box>
        <IconButton size="small" onClick={() => setOpen(true)} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="caption">Open calendar</Typography>
        </IconButton>
        <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
          <DialogContent sx={{ p: 2 }}>{calendarPaper}</DialogContent>
        </Dialog>
      </Box>
    );
  }

  return calendarPaper;
};

export default CalendarWidget;


