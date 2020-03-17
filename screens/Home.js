import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { connect } from "react-redux";
import { updateResults } from "../redux/actions/userReducer";

import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");
import products from "../constants/products";
import axios from "axios";

class Home extends React.Component {
  componentDidMount() {
    axios({
      method: "GET",
      url: "https://faroo-faroo-web-search.p.rapidapi.com/api",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "faroo-faroo-web-search.p.rapidapi.com",
        "x-rapidapi-key": "3d441973b3msh022be63635ed551p19e279jsn9e3bd8a1b48d"
      },
      params: {
        q: "covid19"
      }
    })
      .then(response => {
        const { updateResults } = this.props;
        // console.log(response.data.results);
        const results = response.data.results;
        updateResults(results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderSearch = () => {
    const { navigation } = this.props;
    const iconCamera = (
      <Icon
        size={16}
        color={theme.COLORS.MUTED}
        name="zoom-in"
        family="material"
      />
    );

    return (
      <Input
        right
        color="black"
        style={styles.search}
        iconContent={iconCamera}
        placeholder="What are you looking for?"
        onFocus={() => navigation.navigate("Pro")}
      />
    );
  };

  renderTabs = () => {
    const { navigation } = this.props;

    return (
      <Block row style={styles.tabs}>
        <Button
          shadowless
          style={[styles.tab, styles.divider]}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
            <Text size={16} style={styles.tabTitle}>
              Categories
            </Text>
          </Block>
        </Button>
        <Button
          shadowless
          style={styles.tab}
          onPress={() => navigation.navigate("Pro")}
        >
          <Block row middle>
            <Icon
              size={16}
              name="camera-18"
              family="GalioExtra"
              style={{ paddingRight: 8 }}
            />
            <Text size={16} style={styles.tabTitle}>
              Best Deals
            </Text>
          </Block>
        </Button>
      </Block>
    );
  };

  renderProducts = () => {
    const { results } = this.props;
    console.log(results);

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        <Block flex>
          <Product product={products[0]} horizontal />
          {/* <Block flex row>
            <Product
              product={products[1]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
            <Product
              product={products[2]}
              style={{ marginRight: theme.SIZES.BASE }}
            />
          </Block> */}
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const mstp = ({ userReducer }) => ({
  name: userReducer.name
});

const mdtp = {
  updateResults
};

export default connect(mstp, mdtp)(Home);

const styles = StyleSheet.create({
  home: {
    width: width
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.5,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: "300"
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2
  }
});
