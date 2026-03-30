import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { StarIconSolid } from "../../utils/icons";
import { motion } from "framer-motion";

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    location: string;
  };
  rating: number;
  comment: string;
  date: string;
  topic: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ py: 6, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                mb: 2,
                color: "text.primary",
              }}
            >
              What Our Community Says
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Real voices from Kenyan youth sharing their thoughts on current affairs, 
              county news, and social issues affecting our communities
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            {/* Overlapping Avatars */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                mb: isMobile ? 2 : 0,
              }}
            >
              {reviews.slice(0, 3).map((review, index) => (
                <motion.div
                  key={review.id}
                  variants={itemVariants}
                  style={{
                    position: "relative",
                    zIndex: 3 - index,
                    marginLeft: index > 0 ? -15 : 0,
                  }}
                >
                  <Avatar
                    src={review.user.avatar}
                    alt={review.user.name}
                    sx={{
                      width: 60,
                      height: 60,
                      border: 3,
                      borderColor: "background.paper",
                      boxShadow: theme.shadows[2],
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            {/* Rating Display */}
            <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                {[...Array(5)].map((_, index) => (
                  <StarIconSolid
                    key={index}
                    style={{
                      color: theme.palette.warning.main,
                      width: 20,
                      height: 20,
                    }}
                  />
                ))}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {reviews.length} Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average rating from our Kenyan youth community
              </Typography>
            </Box>
          </Box>

          {/* Review Cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {reviews.slice(0, 3).map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                style={{ display: "flex" }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    "&:hover": {
                      boxShadow: theme.shadows[8],
                    },
                    transition: theme.transitions.create(["box-shadow"]),
                  }}
                >
                  {/* Topic Tag */}
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {review.topic}
                    </Typography>
                  </Box>

                  {/* Stars */}
                  <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                    {[...Array(review.rating)].map((_, starIndex) => (
                      <StarIconSolid
                        key={starIndex}
                        style={{
                          color: theme.palette.warning.main,
                          width: 16,
                          height: 16,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Review Text */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      flexGrow: 1,
                      display: "-webkit-box",
                      "-webkit-line-clamp": 4,
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      lineHeight: 1.6,
                    }}
                  >
                    "{review.comment}"
                  </Typography>

                  {/* User Info */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={review.user.avatar}
                      alt={review.user.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {review.user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.user.location} • {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ReviewsSection; 