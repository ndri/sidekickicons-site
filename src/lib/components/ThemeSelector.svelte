<script lang="ts">
  import ButtonSelect from "./ButtonSelect.svelte";
  import { storedState } from "$lib/util/storedState.svelte";

  type Theme = "Light" | "Dark" | "System";

  const theme = storedState<Theme>("theme", "System");

  function setDarkTheme(root: HTMLElement) {
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }

  function setLightTheme(root: HTMLElement) {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  // The initial theme is applied before first paint by the script in app.html
  $effect(() => {
    const root = window.document.documentElement;

    if (theme.value === "Light") {
      setLightTheme(root);
    } else if (theme.value === "Dark") {
      setDarkTheme(root);
    } else {
      // System follows the OS, including when it changes while the page is open
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () =>
        systemDark.matches ? setDarkTheme(root) : setLightTheme(root);
      apply();
      systemDark.addEventListener("change", apply);
      return () => systemDark.removeEventListener("change", apply);
    }
  });
</script>

<div class="flex items-center justify-center gap-2">
  <ButtonSelect
    label="Theme"
    selectedValue={theme.value}
    setSelectedValue={(value) => (theme.value = value)}
    values={["Light", "Dark", "System"]}
  />
</div>
