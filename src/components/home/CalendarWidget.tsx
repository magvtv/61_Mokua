import React, { useMemo } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { recentPosts } from '../../services/mockData';

interface CalendarWidgetProps {
  initialDate?: Date;
}

const cellStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 6,
};

const dayCellSx = {
  borderRadius: 1,
  textAlign: 'center' as const,
  py: 0.75,
  fontSize: 12,
};

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ initialDate }) => {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(initialDate ?? new Date());

  const postDates = useMemo(() => {
    const set = new Set<string>();
    for (const post of recentPosts) {
      try {
        const d = parseISO(post.publishedAt);
        set.add(format(d, 'yyyy-MM-dd'));
      } catch {}
    }
    return set;
  }, []);

  const monthMatrix = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: Date[] = [];
    let day = weekStart;
    while (day <= weekEnd) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <IconButton size="small" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
          <ChevronLeft fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton size="small" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ ...cellStyles, mb: 0.5, color: 'text.secondary' }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => (
          <Box key={d} sx={{ textAlign: 'center', fontSize: 11 }}>{d}</Box>
        ))}
      </Box>

      <Box sx={cellStyles}>
        {monthMatrix.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const key = format(day, 'yyyy-MM-dd');
          const hasPost = postDates.has(key);
          const isToday = isSameDay(day, new Date());
          return (
            <Box
              key={key}
              sx={{
                ...dayCellSx,
                bgcolor: hasPost ? 'primary.main' : isToday ? 'action.hover' : 'transparent',
                color: hasPost ? 'primary.contrastText' : inMonth ? 'text.primary' : 'text.disabled',
                border: isToday && !hasPost ? 1 : 0,
                borderColor: 'divider',
              }}
              title={hasPost ? 'Posts published on this date' : undefined}
            >
              {format(day, 'd')}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CalendarWidget;


