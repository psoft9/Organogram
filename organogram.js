var prOrganogram = {
    prWrap: {
      prBoxWrap: "<div class='pr-box'>Main</div>",
      children: [
        {
          prWrap: {
            prBoxWrap: "<div class='pr-box'>Child 1</div>",
            children: [
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 1</div>",
                  children: []
                }
              },
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 2</div>",
                  children: []
                }
              }
            ]
          }
        },
        {
          prWrap: {
            prBoxWrap: "<div class='pr-box'>Child 2</div>",
            children: [
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 3</div>",
                  children: []
                }
              },
              {
                prWrap: {
                  prBoxWrap: "<div class='pr-box'>GC 40</div>",
                  children: [
                    {
                        prWrap: {
                          prBoxWrap: "<div class='pr-box'>GC 30</div>",
                          children: []
                        }
                      },
                      {
                        prWrap: {
                          prBoxWrap: "<div class='pr-box'>GC 31</div>",
                          children: [
                            {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 301</div>",
                                  children: []
                                }
                              },
                              {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 311</div>",
                                  children: []
                                }
                              },
                              {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 321</div>",
                                  children: []
                                }
                              }
                          ]
                        }
                      },
                      {
                        prWrap: {
                          prBoxWrap: "<div class='pr-box'>GC 32</div>",
                          children: [
                            {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 0</div>",
                                  children: []
                                }
                              },
                              {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 1</div>",
                                  children: []
                                }
                              },
                              {
                                prWrap: {
                                  prBoxWrap: "<div class='pr-box'>GC 2</div>",
                                  children: []
                                }
                              }
                          ]
                        }
                      }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  };
  