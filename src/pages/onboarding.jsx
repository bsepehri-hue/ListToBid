<option value="Artifacts">Artifacts</option>
          <option value="Apparel">Apparel</option>
        </select>

        <textarea name="description" placeholder="Store Description" />

        <div className="flex items-center">
          <input type="checkbox" id="oath" name="accepted_oath" required />
          <label htmlFor="oath" className="ml-2">
            I accept the Steward's Oath.
          </label>
        </div>

        <button type="submit" className="btn-mythic btn-emerald">
          Claim My Scroll
        </button>
      </form>
    </div>
  );
}