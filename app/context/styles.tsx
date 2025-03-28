import { StyleSheet } from "react-native";

const MainStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e0e0e0",
    fontFamily: "sans-serif",
  },

  scrollView: {
    paddingTop: 10,
    gap: 5,
    height: "auto",
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productBox: {
    width: "47.5%",
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    cursor: "pointer",
  },

  productImage: {
    height: 150,
    width: 150,
  },

  productDetImage: {
    height: 300,
    width: "auto",
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
  },

  productDescriptionTitle: {
    fontSize: 18,
  },

  productDescription: {
    fontSize: 16,
  },

  prodcontainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    fontFamily: "sans-serif",
  },

  prodscrollView: {
    padding: 32,
    paddingBottom: 80,
    height: "auto",
  },

  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  searchBar: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cartList: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    gap: 5,
    marginBottom: 15,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default MainStyle;
