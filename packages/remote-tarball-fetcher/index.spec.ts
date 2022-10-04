describe("Remote Tarball Fetcher", () => {
  describe("When using the remote npm registry", () => {
    it("should fetch the tarball", () => {
      const fetcher = new NpmTarballFetcher();

      fetcher.fetchRemoteTarball("z");
    });
  });
});
